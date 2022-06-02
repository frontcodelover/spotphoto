import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default function decouverte() {
  return (
    <>
    <Nav />
    <main className='py-9'>
    <div className='body-size'>
    <p className='font-semibold text-xl text-zinc-900'>Découvrez</p>
    <h1 className='text-4xl pb-9 text-green-500 font-bold'>Le lieux de votre prochaine photo</h1>
    <section className='flex flex-row'>
    <div className="basis-1/3 bg-gray-100 p-9">Italie</div>
    <div className="basis-1/3 bg-gray-100 p-9">France</div>
    <div className="basis-1/3 bg-gray-100 p-9">Portugal</div>
    </section>
    <section className='flex flex-row'>
    <div className="basis-1/3 bg-gray-100 p-9">Royaume-Uni</div>
    <div className="basis-1/3 bg-gray-100 p-9">Espagne</div>
    <div className="basis-1/3 bg-gray-100 p-9">USA</div>
    </section> 
    <section className='flex flex-row'>
    <div className="basis-1/3 bg-gray-100 p-9">Islande</div>
    <div className="basis-1/3 bg-gray-100 p-9">Colombie</div>
    <div className="basis-1/3 bg-gray-100 p-9">Australie</div>
    </section>
    <section className='flex flex-row'>
    <div className="basis-1/3 bg-gray-100 p-9">Japon</div>
    <div className="basis-1/3 bg-gray-100 p-9">Chine</div>
    <div className="basis-1/3 bg-gray-100 p-9">Pologne</div>
    </section>
    </div>
    <Footer />
    </main>
    </>
  )
}
