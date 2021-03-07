import { LanguageEntity } from 'src/language/entities/language.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';

type Response = string | LanguageEntity | ProjectEntity | UserEntity;
export interface ResponseOk {
  status?: boolean;
  data?:
    | Response
    | {
        total: number;
        items: Response[];
      };
}
