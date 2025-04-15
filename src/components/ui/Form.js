import React from 'react';
import styled from 'styled-components';

// استایل‌های پایه برای فرم‌ها
const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &::placeholder {
    color: #bbb;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  transition: border-color 0.3s ease;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &::placeholder {
    color: #bbb;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const HelperText = styled.div`
  color: #7f8c8d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// کامپوننت‌های فرم
export const Form = ({ children, onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };
  
  return (
    <FormContainer onSubmit={handleSubmit} {...props}>
      {children}
    </FormContainer>
  );
};

export const FormField = ({ 
  label, 
  error, 
  helperText, 
  children 
}) => {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && <HelperText>{helperText}</HelperText>}
    </FormGroup>
  );
};

export const TextField = ({ 
  label, 
  error, 
  helperText, 
  ...props 
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      <Input {...props} />
    </FormField>
  );
};

export const TextareaField = ({ 
  label, 
  error, 
  helperText, 
  ...props 
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      <Textarea {...props} />
    </FormField>
  );
};

export const SelectField = ({ 
  label, 
  error, 
  helperText, 
  options = [], 
  ...props 
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      <Select {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormField>
  );
};

export const CheckboxField = ({ 
  label, 
  error, 
  helperText, 
  ...props 
}) => {
  return (
    <FormField error={error} helperText={helperText}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox {...props} />
        {label && <span>{label}</span>}
      </div>
    </FormField>
  );
};

export const RadioField = ({ 
  label, 
  error, 
  helperText, 
  options = [], 
  name,
  value,
  onChange,
  ...props 
}) => {
  return (
    <FormField label={label} error={error} helperText={helperText}>
      {options.map((option) => (
        <div key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <RadioButton
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            {...props}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </FormField>
  );
};
