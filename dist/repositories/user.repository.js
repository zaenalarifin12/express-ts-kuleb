"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../config/data-source");
const user_entity_1 = require("../entities/user.entity");
exports.UserRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
