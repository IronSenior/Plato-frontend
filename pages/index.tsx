import React from 'react';
import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <span>Hola Mundo</span><br/>
      <Link href="/signup">
          <a>Sign up</a>
      </Link><br/>
      <Link href="/login">
          <a>Login</a>
      </Link><br/>
      <Link href="/brand/create">
          <a>Crear Marca</a>
      </Link><br/>
      <Link href="/brand/">
          <a>Marcas</a>
      </Link>
    </div>
  );
}

