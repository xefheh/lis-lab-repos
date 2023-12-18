package pages;

import com.codeborne.selenide.ElementsCollection;

import pages.abstractions.RelativePage;

import static com.codeborne.selenide.Selenide.$$x;
import static com.codeborne.selenide.Selenide.$x;

public class CartPage extends RelativePage {
    private final ElementsCollection cartItems = $$x("//div[@class='basket__product']");

    public CartPage(MainPage mainPage) {
        super(mainPage);
    }

    public int getCartItemsCount() {
        return cartItems.size();
    }

    public Boolean canCheckout() {
        return !$x("//div[@class='basket-blank-limit__title']").exists();
    }
}
