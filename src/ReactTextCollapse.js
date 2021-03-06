import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Motion, spring } from "react-motion";

export default class ReactTextCollapse extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    collapseTextStyles: PropTypes.object,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const { options: { collapse } } = this.props;
    this.state = {
      collapse: collapse ? collapse : true
    }
  }

  renderHelperText() {
    const { options: { collapseText, expandText } } = this.props; 
    const { collapse } = this.state;
    if (collapse) {
      return <div>{collapseText}</div>
    } else {
      return <div>{expandText}</div>
    }
  }

  toggleAction() {
    let { collapse } = this.state;
    collapse = !collapse;
    this.setState({ collapse});
    this.props.onClick(collapse)
  }

  render() {
    const { children } = this.props;
    const { minHeight, maxHeight, collapseTextStyles } = this.props.options;
    const { collapse } = this.state;
    return (
      <Motion
        defaultStyle={{h:0}}
        style={{h: spring(collapse ? minHeight : maxHeight)}}>
        {
          ({h}) => (
            <div className={this.props.className}>
              <div 
                  style={{
                    display: `block`,
                    overflow: `hidden`,
                    height: h
                  }}>
                {children}
              </div>
              <div style={collapseTextStyles} onClick={this.toggleAction.bind(this)}>{this.renderHelperText()}</div>
            </div>
          )
        }
      </Motion>
    );
  }
}
