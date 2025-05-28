export function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    // we can use util file for commmon error and success 
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
}
