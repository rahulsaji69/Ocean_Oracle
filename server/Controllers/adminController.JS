const User = require('../Models/User');

exports.getUsers = async (req, res) => {
    try {
       
        const users = await User.find({role: 'customer'}).select('-password'); 

      
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching users'
        });
    }
};