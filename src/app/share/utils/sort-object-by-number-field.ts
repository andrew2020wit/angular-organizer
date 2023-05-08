export function sortObjectByNumberField(field: string ) {
  return (a: any, b: any) =>  +a[field] > +b[field] ? 1 : +a[field] < +b[field] ? -1 : 0
}
