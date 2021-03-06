import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { CartContext } from "./CartProvider"
import css from "./ProductThumbnail.module.css"

const ProductThumbnail = ({ product }) => {
  const { available } = useContext(CartContext)

  const availablePrices = product.prices.filter(({ id }) => available(id))
  const soldOut = availablePrices.length === 0

  return (
    <div key={product.id} className={css.container}>
      <Link to={`/buy/${product.slug}`}>
        <div className={css.thumbnail}>
          {product.localFiles && (
            <Img
              fluid={product.localFiles[0].childImageSharp.fluid}
              alt={product.name}
              imgStyle={{ filter: soldOut && "grayscale()" }}
            />
          )}
          <div className={css.description}>
            <strong>{product.name}</strong>
            <span>
              {soldOut ? "Sold Out" : `$${product.prices[0].unit_amount / 100}`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

ProductThumbnail.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductThumbnail
