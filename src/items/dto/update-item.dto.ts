import { CreateCommnentDto } from './create-comment.dto';

export class UpdateItemDto {
  public: boolean;
  comments: CreateCommnentDto[];
}
