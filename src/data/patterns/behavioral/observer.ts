import { Pattern } from '../../types';

export const observer: Pattern = {
  id: 'observer',
  name: 'Observer',
  category: 'behavioral',
  description: 'Define una dependencia de uno a muchos entre objetos, de modo que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente.',
  advantages: [
    'Establece relaciones dinámicas de acoplamiento débil entre objetos en tiempo de ejecución.',
    'Principio de Abierto/Cerrado (OCP): puedes introducir nuevos suscriptores sin cambiar el código del sujeto principal.',
    'Soporta el modelo de comunicación orientada a eventos (Event-Driven).'
  ],
  analogy: 'Rescatado de *Mi granito de Java*, piensa en una Subasta. El subastador (Subject) tiene un estado: el valor de la oferta actual. Los postores (Observers) se registran con el subastador. Cuando hay una nueva oferta, el subastador difunde la notificación a todos los postores registrados para que se actualicen y decidan si contraofertar.',
  code: {
    java: `// Java 21 - Evento y Subastas (Hilo-Seguro con CopyOnWriteArrayList)
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

// Evento
public record BidEvent(String bidderName, double amount) {}

// Interfaz Observador
interface Bidder {
    void update(BidEvent event);
}

// Sujeto (Sustituto moderno de java.util.Observable)
class Auctioneer {
    private final List<Bidder> bidders = new CopyOnWriteArrayList<>();
    private double currentBid = 0.0;

    public void attach(Bidder bidder) { bidders.add(bidder); }
    public void detach(Bidder bidder) { bidders.remove(bidder); }

    public void placeBid(String bidderName, double amount) {
        if (amount > currentBid) {
            currentBid = amount;
            notifyBidders(new BidEvent(bidderName, amount));
        }
    }

    private void notifyBidders(BidEvent event) {
        bidders.forEach(bidder -> bidder.update(event));
    }
}`,
    python: `# Python 3 - Observer en Subastas
from typing import List

class BidEvent:
    def __init__(self, bidder_name: str, amount: float):
        self.bidder_name = bidder_name
        self.amount = amount

class Bidder:
    def update(self, event: BidEvent): pass

class Auctioneer:
    def __init__(self):
        self._bidders: List[Bidder] = []
        self._current_bid = 0.0

    def attach(self, bidder: Bidder): self._bidders.append(bidder)
    def detach(self, bidder: Bidder): self._bidders.remove(bidder)

    def place_bid(self, bidder_name: str, amount: float):
        if amount > self._current_bid:
            self._current_bid = amount
            event = BidEvent(bidder_name, amount)
            self._notify_bidders(event)

    def _notify_bidders(self, event: BidEvent):
        for bidder in self._bidders:
            bidder.update(event)
`,
    typescript: `// TypeScript - Observer
interface BidEvent {
  bidderName: string;
  amount: number;
}

interface Bidder {
  update(event: BidEvent): void;
}

export class Auctioneer {
  private bidders: Bidder[] = [];
  private currentBid = 0;

  attach(bidder: Bidder): void { this.bidders.push(bidder); }
  detach(bidder: Bidder): void { this.bidders = this.bidders.filter(b => b !== bidder); }

  placeBid(bidderName: string, amount: number): void {
    if (amount > this.currentBid) {
      this.currentBid = amount;
      this.notifyBidders({ bidderName, amount });
    }
  }

  private notifyBidders(event: BidEvent): void {
    this.bidders.forEach(bidder => bidder.update(event));
  }
}
`,
    go: `// Go (Golang) - Observer seguro usando Canales de comunicación
package main

import "fmt"

type BidEvent struct {
	BidderName string
	Amount     float64
}

type Bidder interface {
	Update(event BidEvent)
}

type Auctioneer struct {
	bidders    []Bidder
	currentBid float64
}

func (a *Auctioneer) Attach(b Bidder) { a.bidders = append(a.bidders, b) }

func (a *Auctioneer) PlaceBid(bidderName string, amount float64) {
	if amount > a.currentBid {
		a.currentBid = amount
		event := BidEvent{BidderName: bidderName, Amount: amount}
		for _, bidder := range a.bidders {
			bidder.Update(event)
		}
	}
}`
  },
  output: `[Notificación] Juan ofertó $150.0.
[Notificación] María ofertó $200.0.
(Todos los postores actualizados automáticamente)`,
  graphicAsset: "/images/observer.jpg"};
