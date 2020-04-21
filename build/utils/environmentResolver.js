"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProduction = exports.isDeployed = void 0;
const isDeployed = process.env.NODE_ENV !== 'local';
exports.isDeployed = isDeployed;
const isProduction = process.env.NODE_ENV === 'production';
exports.isProduction = isProduction;
//# sourceMappingURL=environmentResolver.js.map