import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<div class="container">
  <div class="col">
    <h1>RSS агрегатор</h1>
    <p class="text-start">Начните читать RSS сегодня!</p>
  </div>
  <div class="col">
    <form class="row">
      <div class="col-sm-5">
        <label class="visually-hidden" for="RSS">RSS</label>
        <input type="text" class="form-control" id="RSS" placeholder="RSS">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>  
`
console.log('Hello!')
