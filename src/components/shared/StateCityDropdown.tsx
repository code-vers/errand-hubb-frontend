"use client";

import React, { useMemo } from 'react';
import { State, City } from 'country-state-city';
import { ChevronDown } from 'lucide-react';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  allowAll?: boolean;
}

export const StateDropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, placeholder = "Select State", allowAll = false, ...props }, ref) => {
    const states = useMemo(() => State.getStatesOfCountry("US"), []);

    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`w-full ${className || ''} appearance-none bg-white cursor-pointer pr-10`}
          {...props}
        >
          <option value="" disabled={!allowAll}>
            {placeholder}
          </option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
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
          className={`w-full ${className || ''} bg-white`}
          {...(props as any)}
        />
      );
    }

    const defaultPlaceholder = placeholder || (stateName ? "Select City" : "Select State First");

    return (
      <div className="relative w-full">
        <select 
          ref={ref} 
          disabled={!stateName && !allowAll} 
          className={`w-full ${className || ''} appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${stateName || allowAll ? "cursor-pointer" : ""} pr-10`} 
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
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    );
  }
);
CityDropdown.displayName = 'CityDropdown';

