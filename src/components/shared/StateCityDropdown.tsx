"use client";

import React, { useMemo } from 'react';
import { State, City } from 'country-state-city';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const StateDropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, ...props }, ref) => {
    const states = useMemo(() => State.getStatesOfCountry("US"), []);

    return (
      <select ref={ref} className={`${className} appearance-none bg-white cursor-pointer`} {...props}>
        <option value="" disabled>Select State</option>
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
}

export const CityDropdown = React.forwardRef<HTMLSelectElement, CityDropdownProps>(
  ({ stateName, className, ...props }, ref) => {
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

    return (
      <select 
        ref={ref} 
        disabled={!stateName} 
        className={`${className} appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${stateName ? "cursor-pointer" : ""}`} 
        {...props}
      >
        <option value="" disabled>
          {stateName ? "Select City" : "Select State First"}
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
