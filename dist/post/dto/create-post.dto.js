"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePostDto {
    title;
    content;
    published;
    authorId;
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '标题不能为空' }),
    (0, class_validator_1.IsString)({ message: '标题必须是字符串类型' }),
    (0, class_validator_1.Length)(2, 20, {
        message: '标题长度必须在2到20个字符之间',
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '内容必须是字符串类型' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: '发布状态必须是布尔类型' }),
    __metadata("design:type", Boolean)
], CreatePostDto.prototype, "published", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "作者ID不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "authorId", void 0);
//# sourceMappingURL=create-post.dto.js.map