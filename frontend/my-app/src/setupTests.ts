import '@testing-library/jest-dom';

// Ensure TextEncoder and TextDecoder are available globally for Jest testing purposes
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
