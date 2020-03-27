import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { v4 as uuid } from "uuid";
import { ShoppingItem } from "src/models/shopping-item.model";
import { AppState } from "src/models/app-state.model";
import { AddItemAction, DeleteItemAction } from "src/actions/shopping.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: "", label: "", completed: false };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping);
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = { id: "", label: "", completed: false };
  }
  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
