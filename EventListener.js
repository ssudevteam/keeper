
export class EventListener {
  handlers = [];

  add(type, listenerFunc, deps) {
    const handler = {
      type: type,
      listener: listenerFunc,
      deps: deps,
    };
    this.handlers.push(handler);
  }

  remove(type, listenerFunc) {
    if (type.length === 0) {
      throw new Error("Error adding event listener: `name` must not be empty.");
    }
    type = type.toLowerCase();
    const checksum = type + listenerFunc.toString();
    this.handlers.every((handler, index) => {
      const value = handler.type + handler.listener.toString();
      if (value === checksum) {
        this.handlers.splice(index, 1);
        return false;
      }
    });
  }

  notifyAll(type) {
    this.handlers.forEach((handler) => {
      if (handler.type === type) {
        handler.listener(...(handler.deps || []));
      }
    });
  }
}
