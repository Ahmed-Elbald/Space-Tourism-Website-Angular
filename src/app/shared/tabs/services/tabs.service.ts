import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { keyPressed } from '../helpers/key-pressed.helper';
import { TabsOrientation } from '../models/tabs-orientation.model';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  // Private fields
  private _orientaion!: TabsOrientation;
  private _labels: string[] = [];

  // Subjects
  public activeTabChange = new BehaviorSubject<{ label: string, preventFocus?: boolean }>
    ({ label: this._labels[0], preventFocus: true });
  public focusedTabChange = new BehaviorSubject<string>(this._labels[0]);
  public tablistTabindexChange = new Subject<number>();

  // Public methods
  handleTabKeydownEvent(keydownEvent: KeyboardEvent) {

    // Get the number of tabs
    const numberOfTabs = this._labels.length;

    // Get the tablist out of keyboard sequence
    this.tablistTabindexChange.next(-1)

    // If the arrow right/down key was pressed
    if (keyPressed(keydownEvent, this._orientaion === "horizontal" ? "ArrowRight" : "ArrowDown")) {

      // Prevent page scrolling
      keydownEvent.preventDefault();

      // If it's the last tab in the tablist,
      // Move focus to the first tab
      if (this.focusedTabIndex === numberOfTabs - 1)
        this.changeFocus(0)

      // Otherwise, move focus to the next tab
      else
        this.changeFocus(this.focusedTabIndex + 1)


    }

    // If the arrow left/up key was pressed
    else if (keyPressed(keydownEvent, this._orientaion === "horizontal" ? "ArrowLeft" : "ArrowUp")) {

      // Prevent page scrolling
      keydownEvent.preventDefault();

      // If it's the first tab in the tablist,
      // Move focus to the last tab
      if (this.focusedTabIndex === 0)
        this.changeFocus(numberOfTabs - 1)

      // Otherwise, move focus to the previous tab
      else
        this.changeFocus(this.focusedTabIndex - 1)

    }

    // If the Home key was pressed
    else if (keyPressed(keydownEvent, "Home")) {
      // Prevent page scrolling
      keydownEvent.preventDefault();
      // Move focus to the first tab
      this.changeFocus(0)
    }

    // If the End key was pressed
    else if (keyPressed(keydownEvent, "End")) {
      // Prevent page scrolling
      keydownEvent.preventDefault();
      // Move focus to the last tab
      this.changeFocus(numberOfTabs - 1)
    }

    // If the tab key was pressed
    else if (keyPressed(keydownEvent, "Tab")) {

      // If it the shift key wasn't pressed along, show the corresponding tab panel
      if (!keydownEvent.shiftKey) {
        keydownEvent.preventDefault();
        this.activeTabChange.next({ label: this._labels[this.focusedTabIndex] })
      }

    }

    // Wait a tick before putting the tablist back into keyboard sequence
    setTimeout(() => this.tablistTabindexChange.next(0), 0)

  }

  changeFocus(index: number) {
    this.focusedTabChange.next(this._labels[index])
  }

  // Setters
  set orientation(orientation: TabsOrientation) {
    this._orientaion = orientation
  }

  set labels(labels: string[]) {
    this._labels = labels;
  }

  // Getters
  get activeTabIndex() {
    return this._labels.indexOf(this.activeTabChange.value.label);
  }

  get focusedTabIndex() {
    return this._labels.indexOf(this.focusedTabChange.value)
  }

}

