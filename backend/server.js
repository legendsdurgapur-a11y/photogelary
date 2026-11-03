const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { initialPhotos, albums, photographers, testimonials } = require('./photos.data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload directory setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// In-memory data store with initial seed
let photos = JSON.parse(JSON.stringify(initialPhotos));
let inquiries = [];

// Multer storage configuration for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'gallery-' + uniqueSuffix + ext);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB max
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  const totalPhotos = photos.length;
  const totalLikes = photos.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const totalViews = photos.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const categoriesCount = new Set(photos.map(p => p.category)).size;

  res.json({
    totalPhotos,
    totalLikes,
    totalViews,
    categoriesCount,
    photographersCount: photographers.length
  });
});

// GET /api/photos (with search, category filter, sort, orientation)
app.get('/api/photos', (req, res) => {
  const { category, search, orientation, sort, featured } = req.query;
  let results = [...photos];

  // Category filter
  if (category && category.toLowerCase() !== 'all') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Orientation filter
  if (orientation && orientation.toLowerCase() !== 'all') {
    results = results.filter(p => p.orientation.toLowerCase() === orientation.toLowerCase());
  }

  // Featured filter
  if (featured === 'true') {
    results = results.filter(p => p.featured);
  }

  // Search keyword (matches title, description, tags, photographer name, camera)
  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    results = results.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false;
      const matchPhotographer = p.photographer && p.photographer.name.toLowerCase().includes(q);
      const matchTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const matchCamera = p.exif && (
        (p.exif.camera && p.exif.camera.toLowerCase().includes(q)) ||
        (p.exif.lens && p.exif.lens.toLowerCase().includes(q))
      );
      return matchTitle || matchDesc || matchPhotographer || matchTags || matchCamera;
    });
  }

  // Sorting
  if (sort === 'popular') {
    results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (sort === 'views') {
    results.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    // Default: 'newest'
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  res.json(results);
});

// GET /api/photos/:id
app.get('/api/photos/:id', (req, res) => {
  const photo = photos.find(p => p.id === req.params.id);
  if (!photo) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  // Increment view count on retrieval
  photo.views = (photo.views || 0) + 1;
  res.json(photo);
});

// POST /api/photos/:id/like (Toggle like status)
app.post('/api/photos/:id/like', (req, res) => {
  const photo = photos.find(p => p.id === req.params.id);
  if (!photo) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  photo.isLiked = !photo.isLiked;
  if (photo.isLiked) {
    photo.likes = (photo.likes || 0) + 1;
  } else {
    photo.likes = Math.max(0, (photo.likes || 0) - 1);
  }
  res.json({ id: photo.id, likes: photo.likes, isLiked: photo.isLiked });
});

// POST /api/photos/:id/comments (Add comment)
app.post('/api/photos/:id/comments', (req, res) => {
  const photo = photos.find(p => p.id === req.params.id);
  if (!photo) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  const { user, text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  const newComment = {
    id: 'c_' + Date.now(),
    user: user && user.trim() !== '' ? user.trim() : 'Art Collector',
    text: text.trim(),
    time: 'Just now'
  };
  if (!photo.comments) {
    photo.comments = [];
  }
  photo.comments.unshift(newComment);
  res.status(201).json(newComment);
});

// POST /api/photos (Create / Upload photo)
app.post('/api/photos', upload.single('photoFile'), (req, res) => {
  try {
    const {
      title,
      category,
      photographerName,
      photographerLocation,
      description,
      orientation,
      tags,
      camera,
      lens,
      aperture,
      shutterSpeed,
      iso,
      imageUrl: customUrl
    } = req.body;

    let finalImageUrl = customUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      finalImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=85';
    }

    const newPhoto = {
      id: 'photo-' + Date.now(),
      title: title || 'Untitled Masterpiece',
      category: category || 'Landscape',
      photographer: {
        name: photographerName || 'Guest Photographer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        handle: '@' + (photographerName ? photographerName.toLowerCase().replace(/\s+/g, '_') : 'guest'),
        location: photographerLocation || 'Studio'
      },
      imageUrl: finalImageUrl,
      thumbnailUrl: finalImageUrl,
      orientation: orientation || 'landscape',
      aspectRatio: orientation === 'portrait' ? '4/5' : orientation === 'square' ? '1/1' : '16/10',
      description: description || 'Captivating moment captured through artistic perspective.',
      featured: false,
      likes: 1,
      views: 12,
      isLiked: false,
      date: new Date().toISOString().split('T')[0],
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : ['Art', 'Gallery'],
      exif: {
        camera: camera || 'Professional Mirrorless',
        lens: lens || '50mm f/1.4',
        focalLength: '50mm',
        aperture: aperture || 'f/2.8',
        shutterSpeed: shutterSpeed || '1/250s',
        iso: iso || '100',
        dimensions: '6000 × 4000'
      },
      comments: []
    };

    photos.unshift(newPhoto);
    res.status(201).json(newPhoto);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

// DELETE /api/photos/:id
app.delete('/api/photos/:id', (req, res) => {
  const index = photos.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }
  const deleted = photos.splice(index, 1)[0];
  res.json({ message: 'Photo deleted successfully', photo: deleted });
});

// GET /api/albums
app.get('/api/albums', (req, res) => {
  res.json(albums);
});

// GET /api/photographers
app.get('/api/photographers', (req, res) => {
  res.json(photographers);
});

// GET /api/testimonials
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

// POST /api/inquiries (Client booking / Art print acquisition)
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, serviceType, date, budget, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const inquiry = {
    id: 'inq-' + Date.now(),
    name,
    email,
    phone: phone || '',
    serviceType: serviceType || 'Editorial Shoot',
    date: date || '',
    budget: budget || '$2,500 - $5,000',
    message: message || '',
    createdAt: new Date().toISOString()
  };

  inquiries.push(inquiry);
  res.status(201).json({
    success: true,
    message: 'Thank you for your inquiry! Our studio representative will contact you within 24 hours.',
    inquiry
  });
});

// Serve Angular static production build if present
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist', 'frontend', 'browser');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api') || req.url.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Professional Photo Gallery API listening at http://localhost:${PORT}`);
});
