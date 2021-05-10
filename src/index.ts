document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.todo').forEach(container => todo(container));
});

function todo(container: Element) {
  container.innerHTML = `
    <h2>ToDo</h2>
    <ul></ul>
    <h3>0 Done</h3>
    <form>
      <input type="text" name="text" />
      <button type="submit">Add</button>
    </form>
  `;

  const form = container.querySelector<HTMLFormElement>('form');
  const list = container.querySelector<HTMLUListElement>('ul');
  const done = container.querySelector<HTMLHeadingElement>('h3');

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const input = form.elements["text"] as HTMLInputElement;
    addItem(input.value);
    form.reset();
  });

  function addItem(itemText: string) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(itemText));

    const check = document.createElement("input");
    check.type = "checkbox";
    check.addEventListener("change", () => recount());
    item.appendChild(check);

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click", () => {
      list.removeChild(item);
      recount();
    });
    item.appendChild(button);

    list.appendChild(item);
  }

  function recount() {
    const count = list.querySelectorAll('input:checked').length;
    done.textContent = `${count} Done`;
  }
}