import React from "react";

export interface IModalProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  closed: boolean;
  continueDisabled?: boolean;
  cancelHidden?: boolean;
  onClose: (event: React.MouseEvent) => void;
  onContinue: (event: React.MouseEvent) => void;
}