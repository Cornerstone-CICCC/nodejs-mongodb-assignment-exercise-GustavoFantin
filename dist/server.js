"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./routes/product.route"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
//Routes
app.use('/product', product_route_1.default);
//Fallback
app.use((req, res) => {
    res.status(404).send("404 server error. Page not found.");
});
// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;
if (!process.env.DATABASE_URI) {
    throw Error(`Missing connection string`);
}
const MONGODB_URI = process.env.DATABASE_URI;
mongoose_1.default
    .connect(MONGODB_URI, { dbName: 'store' })
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
})
    .catch((err) => console.error('Failed to connect to MongoDB', err));
