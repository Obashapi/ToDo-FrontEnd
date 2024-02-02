import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
  name: 'searchFilter',
  standalone:true
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (!value) return null;
    if (!args || args.length === 0) return value;

    const searchString = args[0].toLowerCase(); // Access the first element of the args array
    debugger;
    return value.filter(function (item: any) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(searchString);
    });
  }
}