import { MessageBarService } from './../../../shared/services/message-bar.service';

import { StudentService } from '../../../dashboard/service/student.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StorageKeyConstant } from '../../../shared/constants/storage-keys.constant';
import { TableCols, TableHeaders } from '../../../shared/models/new/table-headers.model copy';
import { QuizResult } from '../../model/student-history.model';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Component } from '@angular/core';
import { StringConstant } from '../../../shared/constants/string-constant';
import { ActionType, DataTableActions } from '../../../shared/models/new/data-table-actions';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent {

  resultList: QuizResult[] = [];
  headers: TableHeaders[] = [];
  podiumList: QuizResult[] = [];

  constructor(private localStorageService: LocalStorageService,
    private studentService: StudentService, private messageBarService: MessageBarService) {
    this.getResult();
  }

  getResult() {
    const localKeys = this.localStorageService.getKeys(StorageKeyConstant.quiz_result);
    if (localKeys) {
      const getLatest = this.findLatestDate(localKeys as string[]);
      const localData = this.localStorageService.getData(`${StorageKeyConstant.quiz_result}_${getLatest}`);
      this.resultList = localData as QuizResult[];
      const topThree = this.resultList.splice(0, 3);
      this.podiumList = topThree.sort((a: any, b: any) => b?.rank - a?.rank);
      if (this.resultList && this.resultList.length > NumberConstant.ZERO) {
        this.headers = this.studentService.setLeaderBoardHeaders();
      } else {
        this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG)
      }
    }
  }
  findLatestDate(dates: string[]): string {
    return dates
      .map(date => date.replace(`${StorageKeyConstant.quiz_result}_`, '')) // Remove the base key
      .reduce((latest, current) => {
        const currentDate = new Date(current);
        return currentDate > new Date(latest) ? current : latest;
      });
  }
  actionItems(event: DataTableActions) {
    console.log(event)
  }

}
