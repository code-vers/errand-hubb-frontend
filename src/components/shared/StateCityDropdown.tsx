"use client";

import React, { useMemo } from 'react';
import { State, City } from 'country-state-city';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  allowAll?: boolean;
}

export const StateDropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, placeholder = "Select State", allowAll = false, ...props }, ref) => {
    const states = useMemo(() => State.getStatesOfCountry("US"), []);

    return (
      <select ref={ref} className={`${className} appearance-none bg-white cursor-pointer`} {...props}>
        <option value="" disabled={!allowAll}>
          {placeholder}
        </option>
        {states.map((s) => (
          <option key={s.isoCode} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>
    );
  }
);
StateDropdown.displayName = 'StateDropdown';

interface CityDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  stateName: string;
  placeholder?: string;
  allowAll?: boolean;
}

export const CityDropdown = React.forwardRef<HTMLSelectElement, CityDropdownProps>(
  ({ stateName, className, placeholder, allowAll = false, ...props }, ref) => {
    const cities = useMemo(() => {
      if (!stateName) return [];
      const states = State.getStatesOfCountry("US");
      const stateObj = states.find((s) => s.name === stateName);
      if (!stateObj) return [];
      return City.getCitiesOfState("US", stateObj.isoCode);
    }, [stateName]);

    if (stateName && cities.length === 0) {
      return (
        <input
          ref={ref as any}
          type="text"
          placeholder="Enter city manually"
          className={`${className} bg-white`}
          {...(props as any)}
        />
      );
    }

    const defaultPlaceholder = placeholder || (stateName ? "Select City" : "Select State First");

    return (
      <select 
        ref={ref} 
        disabled={!stateName && !allowAll} 
        className={`${className} appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${stateName || allowAll ? "cursor-pointer" : ""}`} 
        {...props}
      >
        <option value="" disabled={!allowAll}>
          {defaultPlaceholder}
        </option>
        {cities.map((c) => (
          <option key={`${c.name}-${c.stateCode}`} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    );
  }
);
CityDropdown.displayName = 'CityDropdown';
