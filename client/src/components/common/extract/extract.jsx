/* eslint-disable */
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/common/common';
import { PDFExport } from '@progress/kendo-react-pdf';
import './styles.scss';

const Extract = ({ extract, onClose }) => {
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const { user } = useSelector(state => ({
    user: state.profile.user
  }));

  return (
    <div className={'modal-custom'}>
      <div className={'modal-content'}>
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <div ref={container} className={'extract-wrapper'}>
            <div className={'extract-title'}>
              <div className={'extract-title-text'}>
                Витяг з Єдиного реєстру спецальних бланів нотаріальних
                документів
              </div>
              <div className={'extract-title-organization'}>
                {`${user.organization.organizationName}, ${user.organization.address}`}
              </div>
            </div>
            <div className={'extract-table-wrapper'}>
              <table div className={'extract-table'}>
                <tr>
                  <td className={'extract-th'}>Параметри пошуку</td>
                  <td className={'extract-th'}>Дата витрачання</td>
                  <td className={'extract-th'}>Проплачено</td>
                  <td className={'extract-th'}>Дані реєстратора</td>
                  <td className={'extract-th'}>Чи є дані</td>
                  {!extract.isEmpty && (
                    <>
                      <td className={'extract-th'}>Серія</td>
                      <td className={'extract-th'}>Код</td>
                      <td className={'extract-th'}>Причина</td>
                    </>
                  )}
                </tr>
                <tr>
                  <td>{extract.params}</td>
                  <td>{extract.issueDate}</td>
                  <td>{`${
                    extract.isPaid ? 'Проплачено' : 'Не проплачено'
                  }`}</td>
                  <td>{`${extract.user.passport.name} ${extract.user.passport.surname}`}</td>
                  <td>{`${extract.isEmpty ? 'Ні' : 'Так'}`}</td>
                  {!extract.isEmpty && (
                    <>
                      <td>{extract.blank.series}</td>
                      <td>{extract.blank.code.code}</td>
                      <td>{extract.blank.code.name}</td>
                    </>
                  )}
                </tr>
              </table>
            </div>
            <div className={'extract-footer-info'}>
              <div className={'extract-footer-info-stamp'}>
                Штамп: __________
              </div>
              <div className={'extract-footer-info-signature'}>
                Підпис: __________
              </div>
            </div>
          </div>
        </PDFExport>
        <Button onClick={onClose}>Вихід</Button>
        <Button onClick={exportPDFWithComponent}>Експортувати витяг</Button>
      </div>
    </div>
  );
};

export default Extract;
