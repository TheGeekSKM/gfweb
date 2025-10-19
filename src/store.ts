import type { Character, Item } from "./data/templates";
import * as Types from "./data/templates.ts";
import * as Data from "./data/globalData.ts";

type Listener<T> = (payload: T) => void;
type StateUpdater<T> = (prevState: T) => T;

export class Store<T> 
{
    private state: T;
    private listeners: Set<Listener<T>> = new Set();

    constructor(initialState: T) 
    {
        this.state = initialState;
    }

    public GetState(): T 
    {
        return this.state;
    }

    public SetState(newState: T | StateUpdater<T>, caller: string): void
    {
        const nextState = typeof newState === 'function' ? (newState as StateUpdater<T>)(this.state) : newState;

        console.log(`State Update (${caller}):`, nextState);

        if (nextState !== this.state)
        {
            this.state = nextState;
            this.Notify();
        }
    }

    // returns a function to unsubscribe
    public Subscribe(listener: Listener<T>): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        }
    }  

    public Notify(): void
    {
        this.listeners.forEach(listener => listener(this.state));
    }
}

export interface AppState
{
    player : Character;
    playerLoaded : boolean;
    currentItemInUse : Item | null;
    previousScene : string;
    currentScene : string;
}

const initialState : AppState = {
    player : Types.CreateNewCharacter("Temp Player", 1, [], []),
    playerLoaded : false,
    currentItemInUse : null,
    previousScene : "",
    currentScene : "",
};

export const AppStore = new Store<AppState>(initialState);

