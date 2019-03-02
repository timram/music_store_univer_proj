import React from 'react';

export default ({
  id,
  name,
  brand,
  type,
  availability,
  price,
  image_url
}) =>
  <div className="products-grid-card">
    <a href={`/products/${id}`} className="d-block h-100 products-grid-card-content">
      <div className="d-flex  justify-content-center align-items-center">
        <img
          className="card-img-top"
          src={image_url}
          alt={name}
        />
      </div>
      <div className="card-body">
        <p className="product-card-meta card-text text-capitalize">
          {type} / {brand}
        </p>
        <h4 className="product-card-title card-title text-capitalize">
          {name}
        </h4>
        <p className="product-card-price card-text text-dark">
          {price} руб.
        </p>
        <p
          className="product-card-avail card-text text-secondary"
          display-if={!availability}
        >
          (Нет в наличии)
        </p>
      </div>
    </a>
  </div>