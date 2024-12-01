const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
}

exports.register = async (req, res) => {
    const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ message: 'Utilisateur déjà existant' });
    return;
  }

  const user = new User({ email, password });

  try {
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }

}