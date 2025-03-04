import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../../services/transaction.service';
import { TransactionResponse } from '../../../../interfaces/Transaction.interface';
import { TableComponent } from '../../../general/table/table.component';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule,TableComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: TransactionResponse[] = [];
  selectedAccountNumber: string = '';
  showTransactionModal: boolean = false;


  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.filterTransactions();
  }


  filterTransactions() {
    if (this.selectedAccountNumber) {
      this.transactionService.getTransactions(this.selectedAccountNumber).subscribe({
        next: (transactionResponses) => {
          if (transactionResponses && transactionResponses.length > 0) {
            this.transactions = Array.isArray(transactionResponses[0])
              ? transactionResponses[0]
              : transactionResponses;
          } else {
            this.transactions = [];
          }
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
        }
      });
    } else {
      this.transactions = [];
    }
  }

  searchByAccountNumber(){
    this.filterTransactions();
  }
} 
