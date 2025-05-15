declare module "html2pdf.js" {
  export interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { dpi: number; letterRendering: boolean };
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  function html2pdf(): {
    from: (element: HTMLElement) => {
      set: (options: Html2PdfOptions) => void;
      save: () => void;
    };
  };

  export default html2pdf;
}
