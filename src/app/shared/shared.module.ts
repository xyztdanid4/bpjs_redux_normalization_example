import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalloutComponent } from './components/callout/callout.component';
// Components
const components = [
  CalloutComponent
];

// Directives
const directives = [];

// Pipes
const pipes = [];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  exports: [
    CommonModule,
    ...components,
    ...directives,
    ...pipes
  ]
})
export class SharedModule { }
