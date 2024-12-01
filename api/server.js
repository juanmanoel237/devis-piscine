const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Import du modèle User
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log(err));

// Fonction pour créer un utilisateur admin si nécessaire
const createAdmin = async () => {
  const adminExist = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!adminExist) {
    const admin = new User({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // Utilisation du mot de passe hardcodé
      role: 'admin'
    });

    try {
      await admin.save();
      console.log('Administrateur créé avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur :', error);
    }
  }
};

createAdmin();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
