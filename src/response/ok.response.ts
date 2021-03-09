import { LanguageEntity } from 'src/language/entities/language.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export type ResponseOk =
  | LanguageEntity
  | ProjectEntity
  | UserEntity
  | string
  | any;
