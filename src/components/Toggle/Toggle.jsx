import React, { useState, useEffect } from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const Toggle = ({ 'data-testid': dataTestId, label, onChange, checked }) => {
  const [checkedStatus, setCheckedStatus] = useState(checked);

  useEffect(() => {
    setCheckedStatus(checked);
  }, [checked]);

  const changeHandle = (ev) => {
    ev.stopPropagation();
    setCheckedStatus(!checkedStatus);

    if (onChange) {
      onChange(ev, !checkedStatus);
    }
  };

  const stLabel = css`
    display: flex;
    align-items: center;
    width: auto;
    margin-right: 0.5rem;
  `;

  const stToggle = css`
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 24px;
    width: '36px';

    input {
      display: none;
    }

    .toggle {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      background-color: #ededed;
      border-radius: 20px;
      transition: all 0.1s ease-out;

      &:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: white;
        top: 2px;
        left: 2px;
        transition: all 0.1s ease-out;
      }
    }

    input:checked ~ .toggle::after {
      left: 18px;
    }

    input:checked ~ .toggle {
      background-color: #1927f0;
      border-color: #163574;
    }
  `;

  return (
    <label css={[stToggle, stLabel]}>
      <input
        data-testid={dataTestId}
        type="checkbox"
        checked={!!checkedStatus}
        onChange={changeHandle}
      />
      {label && <span css={stLabel}>{label}</span>}
      <span className="toggle"></span>
    </label>
  );
};

export default Toggle;
