import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    this.form = this.fb.group({
      text: new FormControl(),
    })
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'Task 1', stage: 0 },
      { name: 'Task 2', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  get formData() {
    return this.form.controls
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      // console.log(stageId, task)
      this.stagesTasks[stageId].push(task);
    }
    console.log(this.stagesTasks)
  }

  dataPass(val) {
    // console.log(val)
    if (val == '' || val == null || val == undefined) {
      return ''
    }
    let obj = {
      name: val, stage: 0
    }
    this.stagesTasks[0].push(obj);
    this.tasks.push(obj)
    console.log(this.stagesTasks)
  }

  generateTestId = (name) => {
    // console.log(name)
    return name.split(' ').join('-');
  }

  back(stageId, taskId, taskName, taskStage) {
    if (taskStage == 1) {
      let val = this.stagesTasks[1].find((x) => x.stage == taskStage && x.name == taskName)
      val.stage = 0
      this.stagesTasks[0].push(val)
      this.stagesTasks[1].splice(taskId, 1)
    } else if (taskStage == 2) {
      let val = this.stagesTasks[2].find((x) => x.stage == taskStage && x.name == taskName)
      val.stage = 1
      this.stagesTasks[1].push(val)
      this.stagesTasks[2].splice(taskId, 1)
    } else if (taskStage == 3) {
      let val = this.stagesTasks[3].find((x) => x.stage == taskStage && x.name == taskName)
      val.stage = 2
      this.stagesTasks[2].push(val)
      this.stagesTasks[3].splice(taskId, 1)
    }
  }

  forward(stageId, taskId, taskName, taskStage) {
    if (taskStage == 0) {
      let val = this.tasks.find((x) => x.stage == taskStage && x.name == taskName)
      console.log(val)
      val.stage = 1
      this.stagesTasks[1].push(val)
      this.stagesTasks[0].splice(taskId, 1)
    } else if (taskStage == 1) {
      let val = this.stagesTasks[1].find((x) => x.stage == taskStage && x.name == taskName)
      val.stage = 2
      this.stagesTasks[2].push(val)
      this.stagesTasks[1].splice(taskId, 1)
    } else if (taskStage == 2) {
      let val = this.stagesTasks[2].find((x) => x.stage == taskStage && x.name == taskName)
      val.stage = 3
      this.stagesTasks[3].push(val)
      this.stagesTasks[2].splice(taskId, 1)
    }
  }

  del(stageId, taskId) {
    this.stagesTasks[stageId].splice(taskId, 1)
  }
}

interface Task {
  name: string;
  stage: number;
}