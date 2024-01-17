
export function keyPressed(event: KeyboardEvent, key: string) {

  if (event.key === key || event.code === key)
    return true;
  return false;

}