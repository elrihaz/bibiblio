import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../models/video.model';
import { Subscription } from 'rxjs';
import { AVoirService } from '../services/a-voir.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a-voir-list',
  templateUrl: './a-voir-list.component.html',
  styleUrls: ['./a-voir-list.component.scss']
})

export class AVoirListComponent implements OnInit, OnDestroy {

  aVoir: Video[];
  aVoirSubscription: Subscription;

  constructor(  private aVoirService: AVoirService,
                private router: Router) { }

  ngOnInit() {
    this.aVoirSubscription = this.aVoirService.aVoirSubject
    .subscribe(
      (videos: Video[]) => {
        this.aVoir = videos;
      }
    );

    this.aVoirService.getAVoir();
    this.aVoirService.emitAVoir();
  }

  onNewAVoir() {
    this.router.navigate(['/a-voir', 'new']);
  }

  onDeleteAVoir(video: Video) {
    if (confirm('Etes-vous sûr(e) de vouloir supprimer ce film ?')) {
      this.aVoirService.removeAVoir(video);
    }
  }

  ngOnDestroy() {
    this.aVoirSubscription.unsubscribe();
  }

}
