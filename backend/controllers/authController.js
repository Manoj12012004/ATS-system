const db=require('../database/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
    try {
    const { name, email, password, role } = req.body;

    // Check if email exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const passwordHash=await bcrypt.hash(password,10)
    // Insert new user
    await db.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, email, passwordHash, role]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const user = rows[0];
        console.log("User found:", user);
        // Debugging output

        console.log("Entered password:", password);
        console.log("Stored hash:", user.Password_Hash);

        
        const isMatch = await bcrypt.compare(password, user.Password_Hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.Id, role: user.Role, email: user.Email,name: user.Name },
            process.env.JWT_SECRET || 'your_default_secret',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.Id,
                name: user.Name,
                email: user.Email,
                role: user.Role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
