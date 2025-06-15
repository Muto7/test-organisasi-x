import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Props {
  data: object[];
  sheetName?: string;
  fileName?: string;
}

const ExportExcelButton = ({ data, sheetName = 'Data', fileName = 'rekap.xlsx' }: Props) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      📥 Export Excel
    </button>
  );
};

export default ExportExcelButton;
