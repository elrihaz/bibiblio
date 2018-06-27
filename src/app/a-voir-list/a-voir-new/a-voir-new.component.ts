import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AVoirService } from '../../services/a-voir.service';
import { Router } from '@angular/router';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-a-voir-new',
  templateUrl: './a-voir-new.component.html',
  styleUrls: ['./a-voir-new.component.scss']
})

export class AVoirNewComponent implements OnInit {

  videoForm: FormGroup;

  constructor(  private aVoirService: AVoirService,
                private router: Router,
                private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      realisatorFirstName: ['', Validators.required],
      realisatorLastName: ['', Validators.required],
      type: ['film', Validators.required]
    });
  }

  onSaveAVoir() {
    const title = this.videoForm.get('title').value;
    const realisatorFirstName = this.videoForm.get('realisatorFirstName').value;
    const realisatorLastName = this.videoForm.get('realisatorLastName').value;
    const type = this.videoForm.get('type').value;
    const id = this.aVoirService.newId();

    const newVideo = new Video(id, title, realisatorFirstName, realisatorLastName, type);

    this.aVoirService.createNewAVoir(newVideo);
    this.router.navigate(['/a-voir']);
  }

  onBack() {
    this.router.navigate(['/a-voir']);
  }

}
