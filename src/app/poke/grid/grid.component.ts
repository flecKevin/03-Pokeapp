import { Component } from '@angular/core';
import { PokeModule } from '../poke.module';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  pokeList: Array<any> = [];

  page: number = 0;

  constructor(private PokeService: PokeService) {
    this.setData();
  }

  setData() {
    this.PokeService.getList(this.page).subscribe((res: any) => {
      this.pokeList = res.results;
    });
  }

  nextPage() {
    this.page += 8;

    this.setData();
  }

  prevPage() {
    this.page -= 8;

    this.setData();
  }
}
