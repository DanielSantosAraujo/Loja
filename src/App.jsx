import { useEffect, useState } from "react";
import { VscSearch } from "react-icons/vsc";
function App() {
  const [vetor, setVetor] = useState([])
  const [tenisVisiveis, setTenisVisiveis] = useState(6);
  const [scrollAtivo, setScrollAtivo] = useState(false)

  useEffect(() => {
    const verificarBarraDeRolagem = () => {
      if (window.scrollY > 100) {
        setScrollAtivo(true);
      } else {
        setScrollAtivo(false);
      }
    };

    window.addEventListener('scroll', verificarBarraDeRolagem);

    return () => {
      window.removeEventListener('scroll', verificarBarraDeRolagem);
    };
  }, []);

  const irParaOTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setVetor(data))
    // .then(json => console.log(json))
  }, [])

  const mostrarMais = () => {
    setTenisVisiveis(tenisVisiveis => tenisVisiveis + 6);
  }


  return (


    <div className=" h-screen flex flex-col">
      <div className="h-[10%] bg-white flex items-center space-x-96  border-red-800 border-b-2">
        <div>
          <p className="text-3xl font-bold ml-2">Tênis</p>
        </div>
        <div className="border h-8   flex rounded-md">
          <input type="text" placeholder="Pesquise aqui" className="outline-none  pl-2 w-80" />
          <button className="pr-2 "><VscSearch /></button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center flex-wrap gap-4 m-4">
          {vetor.slice(0, tenisVisiveis).map(tenis => {
            return (
              <div key={tenis.id} className="flex items-center  w-[30%]  border rounded-md border-black">
                <div className="">
                  <img src={tenis.image} alt={tenis.category} className="h-[120px] w-[120px] p-3" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex  gap-4">
                    <p className="text-sm">{tenis.title}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-sm">Categoria:</p>
                    <p className="text-sm">{tenis.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-sm">Preço:</p>
                    <p className="text-sm">{tenis.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-blue-400 rounded-lg w-20 flex items-center justify-center font-bold text-gray-800">
                      Info</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={mostrarMais} className="bg-gray-400 rounded-lg h-8 w-32 font-bold">Mostrar mais</button>
          <div>{scrollAtivo && (
            <button onClick={irParaOTopo} className="bg-orange-600 rounded-lg h-8 w-32 font-bold">Voltar ao topo</button>
          )}</div>
        </div>
      </div>
    </div>
  )
}

export default App
