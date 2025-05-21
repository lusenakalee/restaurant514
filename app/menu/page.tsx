import React from 'react'
import "./MenuPage.css"

export default function page() {
  return (
    <div className="wrapper">

  <h2 > Our Menu</h2>

  <div className="buttons-container">
    <a href="#" className="button button--is-active" data-target="pizzaMenu">Pizzas</a>
    <a href="#" className="button" data-target="coffeeMenu">Coffee</a>
    <a href="#" className="button" data-target="noodlesMenu">Noodles</a>
  </div>

  <div className="menu menu--is-visible" id="pizzaMenu">
    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Greek Pizza</h3>
        <span className="item__dots"></span>
        <span className="item__price">$22</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Cheese Pizza</h3>
        <span className="item__dots"></span>
        <span className="item__price">$20</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Neapolitan Pizza</h3>
        <span className="item__dots"></span>
        <span className="item__price">$18</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Pepperoni Pizza</h3>
        <span className="item__dots"></span>
        <span className="item__price">$15</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>
  </div> 
  <div className="menu" id="coffeeMenu">
    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Cappuccino</h3>
        <span className="item__dots"></span>
        <span className="item__price">$4</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Iced Coffee</h3>
        <span className="item__dots"></span>
        <span className="item__price">$5</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Café Latte</h3>
        <span className="item__dots"></span>
        <span className="item__price">$3</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Espresso</h3>
        <span className="item__dots"></span>
        <span className="item__price">$4</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>
  </div>
  <div className="menu" id="noodlesMenu">
    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Chicken Noodles</h3>
        <span className="item__dots"></span>
        <span className="item__price">$16</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Egg Noodles</h3>
        <span className="item__dots"></span>
        <span className="item__price">$12</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Veg Noodles</h3>
        <span className="item__dots"></span>
        <span className="item__price">$10</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>

    <div className="item">
      <div className="item__header">
        <h3 className="item__title">Chuck Norris Noodles</h3>
        <span className="item__dots"></span>
        <span className="item__price">$20</span>
      </div>
      <p className="item__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt quos harum officia eaque nobis ut.</p>
    </div>
  </div>

</div>
  )
}
