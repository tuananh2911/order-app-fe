import React from 'react';
import { Footer, Header } from '../../components';

const QRNotification: React.FC = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 pt-20 text-center">
          <div>
            <h2 className="text-5xl font-bold mb-4">Vui lòng quét QR</h2>
            <p className="text-xl text-gray-700">Để truy cập trang web, vui lòng quét mã QR được cung cấp.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
}
  
export default QRNotification;
