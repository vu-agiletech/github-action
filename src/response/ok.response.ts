import { LanguageEntity } from 'src/language/entities/language.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';

type Response = string | LanguageEntity | ProjectEntity;
export interface ResponseOk {
  status: boolean;
  data?:
    | Response
    | {
        total: number;
        items: Response[];
      };
}
