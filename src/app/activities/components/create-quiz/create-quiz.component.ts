
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InputType, QuizType, QuizTypeList } from '../models/quiz-type.model';


@Component({
  selector: 'app-quiz-form',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  quizForm: FormGroup;
  quizTypes = QuizTypeList;
  inputTypes = InputType;
  selectedQuizType: InputType | null = null;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      quizType: [null, Validators.required],
      quizzes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.quizForm.get('quizType')?.valueChanges.subscribe((value: InputType) => {
      this.selectedQuizType = value;
      this.updateFormControls();
    });
  }

  get quizzes(): FormArray {
    return this.quizForm.get('quizzes') as FormArray;
  }

  addQuiz() {
    const quizGroup = this.fb.group({
      questionName: ['', Validators.required],
      answer: [''],
      id: [{ value: this.generateId(), disabled: true }],
    });

    // Set validators based on selected quiz type
    if (this.selectedQuizType === this.inputTypes.QUESTION_AND_ANSWER) {
      quizGroup.get('answer')?.setValidators([Validators.required]);
    }

    this.quizzes.push(quizGroup);
  }

  removeQuiz(index: number) {
    this.quizzes.removeAt(index);
  }

  updateFormControls() {
    this.quizzes.clear(); // Clear existing quizzes when the quiz type changes
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const formValue = this.quizForm.value;
      console.log(formValue);
      this.quizForm.reset();
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000); // Replace with your own logic
  }
}
