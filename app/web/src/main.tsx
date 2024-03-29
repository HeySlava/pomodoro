import 'reflect-metadata'
import './main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'inversify-react'
import { container } from './container.ts'

export interface ImportMeta {
  env: {
    VITE_POMODORO_HOST: string,
    VITE_POMODORO_PORT: string
  };
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider container={container}>
      <App />
    </Provider>
  </React.StrictMode>,
)
